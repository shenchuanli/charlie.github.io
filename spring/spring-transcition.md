## 前言

作为Java开发工程师，相信大家对Spring种事务的使用并不陌生。但是你可能只是停留在基础的使用层面上，在遇到一些比较特殊的场景，事务可能没有生效，直接在生产上暴露了，这可能就会导致比较严重的生产事故。今天，我们就简单来说下Spring事务的原理，然后总结一下spring事务失败的场景，并提出对应的解决方案。

## 原理
大家还记得在JDBC中是如何操作事务的吗？伪代码可能如下：
```
//Get database connection
Connection connection = DriverManager.getConnection();
//Set autoCommit is false
connection.setAutoCommit(false);
//use sql to operate database
.........
//Commit or rollback
connection.commit()/connection.rollback

connection.close();
```

需要在各个业务代码中编写代码如commit()、close()来控制事务。
但是Spring不乐意这么干了，这样对业务代码侵入性太大了，所有就用一个事务注解@Transactional来控制事务，底层实现是基于切面编程AOP实现的，而Spring中实现AOP机制采用的是动态代理，具体分为JDK动态代理和CGLIB动态代理两种模式。

    1  Spring的bean的初始化过程中，发现方法有Transactional注解，就需要对相应的Bean进行代理，生成代理对象。
    2  然后在方法调用的时候，会执行切面的逻辑，而这里切面的逻辑中就包含了开启事务、提交事务或者回滚事务等逻辑。

另外注意一点的是，Spring 本身不实现事务，底层还是依赖于数据库的事务。没有数据库事务的支持，Spring事务是不会生效的。

## Spring事务失效场景
### 抛出检查异常
```
@Transactional
public void transactionTest() throws IOException{
    User user = new User();
    UserService.insert(user);
    throw new IOException();
}
```
如果@Transactional 没有特别指定，Spring 只会在遇到运行时异常RuntimeException或者error时进行回滚，而IOException等检查异常不会影响回滚。

```
public boolean rollbackOn(Throwable ex) {
	return (ex instanceof RuntimeException || ex instanceof Error);
}
```
解决方案：

知道原因后，解决方法也很简单。配置rollbackFor属性，例如@Transactional(rollbackFor = Exception.class)。

### 业务方法本身捕获了异常
```
@Transactional(rollbackFor = Exception.class)
public void transactionTest() {
    try {
        User user = new User();
        UserService.insert(user);
        int i = 1 / 0;
    }catch (Exception e) {
        e.printStackTrace();
    }
}
```
这种场景下，事务失败的原因也很简单，Spring是否进行回滚是根据你是否抛出异常决定的，所以如果你自己捕获了异常，Spring 也无能为力。

解决方案：

看，虽然我们知道在处理事务时业务代码不能自己捕获异常，但是只要代码变得复杂，我们就很可能再次出错，所以我们在处理事务的时候要小心，还是不要使用声明式事务, 并使用编程式事务— transactionTemplate.execute()。

### 同一类中的方法调用

```
@Service
public class DefaultTransactionService implement Service {

    public void saveUser() throws Exception {
        //do something
        doInsert();
    }

    @Transactional(rollbackFor = Exception.class)
    public void doInsert() throws IOException {
        User user = new User();
        UserService.insert(user);
        throw new IOException();

    }
}
```

这也是一个容易出错的场景。事务失败的原因也很简单，因为Spring的事务管理功能是通过动态代理实现的，而Spring默认使用JDK动态代理，而JDK动态代理采用接口实现的方式，通过反射调用目标类。简单理解，就是saveUser()方法中调用this.doInsert(),这里的this是被真实对象，所以会直接走doInsert的业务逻辑，而不会走切面逻辑，所以事务失败。
解决方案：
   方案一：解决方法可以是直接在启动类中添加@Transactional注解saveUser()
   方案二：@EnableAspectJAutoProxy(exposeProxy = true)在启动类中添加，会由Cglib代理实现。
### 方法使用 final 或 static关键字

如果Spring使用了Cglib代理实现（比如你的代理类没有实现接口），而你的业务方法恰好使用了final或者static关键字，那么事务也会失败。更具体地说，它应该抛出异常，因为Cglib使用字节码增强技术生成被代理类的子类并重写被代理类的方法来实现代理。如果被代理的方法的方法使用final或static关键字，则子类不能重写被代理的方法。
如果Spring使用JDK动态代理实现，JDK动态代理是基于接口实现的，那么final和static修饰的方法也就无法被代理。
总而言之，方法连代理都没有，那么肯定无法实现事务回滚了。
解决方案：
想办法去掉final或者static关键字

### 方法不是public

如果方法不是public，Spring事务也会失败，因为Spring的事务管理源码AbstractFallbackTransactionAttributeSource中有判断computeTransactionAttribute()。如果目标方法不是公共的，则TransactionAttribute返回null。
```
// Don't allow no-public methods as required.
if (allowPublicMethodsOnly() && !Modifier.isPublic(method.getModifiers())) {
  return null;
}
```
解决方案：

是将当前方法访问级别更改为public。

### 错误使用传播机制
 Spring事务的传播机制是指在多个事务方法相互调用时，确定事务应该如何传播的策略。Spring提供了七种事务传播机制：REQUIRED、SUPPORTS、MANDATORY、REQUIRES_NEW、NOT_SUPPORTED、NEVER、NESTED。如果不知道这些传播策略的原理，很可能会导致交易失败。

```
@Service
public class TransactionService {


    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AddressMapper addressMapper;


    @Transactional(propagation = Propagation.REQUIRES_NEW,rollbackFor = Exception.class)
    public  void doInsert(User user,Address address) throws Exception {
        //do something
        userMapper.insert(user);
        saveAddress(address);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public  void saveAddress(Address address) {
        //do something
        addressMapper.insert(address);
    }
}
```
  在上面的例子中，如果用户插入失败，不会导致saveAddress()回滚，因为这里使用的传播是REQUIRES_NEW，传播机制REQUIRES_NEW的原理是如果当前方法中没有事务，就会创建一个新的事务。如果一个事务已经存在，则当前事务将被挂起，并创建一个新事务。在当前事务完成之前，不会提交父事务。如果父事务发生异常，则不影响子事务的提交。
  
  在上面的例子中，如果用户插入失败，不会导致saveAddress()回滚，因为这里使用的传播是REQUIRES_NEW，传播机制REQUIRES_NEW的原理是如果当前方法中没有事务，就会创建一个新的事务。如果一个事务已经存在，则当前事务将被挂起，并创建一个新事务。在当前事务完成之前，不会提交父事务。如果父事务发生异常，则不影响子事务的提交。
事务的传播机制说明如下：

1.  REQUIRED 如果当前上下文中存在事务，那么加入该事务，如果不存在事务，创建一个事务，这是默认的传播属性值。
2.  SUPPORTS 如果当前上下文存在事务，则支持事务加入事务，如果不存在事务，则使用非事务的方式执行。
3. MANDATORY 如果当前上下文中存在事务，否则抛出异常。
4. REQUIRES_NEW 每次都会新建一个事务，并且同时将上下文中的事务挂起，执行当前新建事务完成以后，上下文事务恢复再执行。
5. NOT_SUPPORTED 如果当前上下文中存在事务，则挂起当前事务，然后新的方法在没有事务的环境中执行。
6. NEVER 如果当前上下文中存在事务，则抛出异常，否则在无事务环境上执行代码。
7. NESTED 如果当前上下文中存在事务，则嵌套事务执行，如果不存在事务，则新建事务。

解决方案:

将事务传播策略更改为默认值REQUIRED。REQUIRED原理是如果当前有一个事务被添加到一个事务中，如果没有，则创建一个新的事务，父事务和被调用的事务在同一个事务中。即使被调用的异常被捕获，整个事务仍然会被回滚。

### 多线程

```
@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleService roleService;

    @Transactional
    public void add(UserModel userModel) throws Exception {

        userMapper.insertUser(userModel);
        new Thread(() -> {
             try {
                 test();
             } catch (Exception e) {
                roleService.doOtherThing();
             }
        }).start();
    }
}

@Service
public class RoleService {

    @Transactional
    public void doOtherThing() {
         try {
             int i = 1/0;
             System.out.println("保存role表数据");
         }catch (Exception e) {
            throw new RuntimeException();
        }
    }
}
```

解决方案
```
TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(transactionDefinition);
//业务处理
dataSourceTransactionManager.commit(transactionStatus);
or
dataSourceTransactionManager.rollback(transactionStatus);
```

## 总结
事务问题会导致数据的不一致，非常重要，另外关于分布式事务的话，这里推荐Seata AT 模式。