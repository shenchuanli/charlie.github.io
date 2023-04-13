### 需求背景
 在使用spring开发web项目的过程当前，我们需要在spring项目中动态的获取容器内部的环境变量或者自定义的配置文件，然后加载到spring environment 中，对于这类需求我们采取扩展spring 生命中期中重要的类EnvironmentPostProcessor。
 ### 代码参考
 ```
 /**
 * 自定义环境处理，在运行SpringApplication之前加载任意配置文件到Environment环境中
 */
public class GatewayEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private final Properties properties = new Properties();

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Resource resource = new ClassPathResource("META-INF/gateway.properties");
        // 加载成PropertySource对象，并添加到Environment环境中
        environment.getPropertySources().addLast(loadProfiles(resource));
    }

    private PropertySource<?> loadProfiles(Resource resource) {
        if (resource == null || !resource.exists()) {
            throw new IllegalArgumentException("资源" + resource + "不存在");
        }
        try {
            properties.load(resource.getInputStream());
            return new PropertiesPropertySource(resource.getFilename(), properties);
        } catch (IOException ex) {
            throw new IllegalStateException("加载配置文件失败" + resource, ex);
        }
    }

}
 ```