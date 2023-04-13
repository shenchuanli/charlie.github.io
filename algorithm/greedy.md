# 贪心算法
## 1.贪心算法的解释

关于贪心算法的解释，网上有众多的版本。这里我们采用 [By Paul E. Black (Fed)](https://www.nist.gov/people/paul-e-black)的说法。 

> A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage.

翻译成人话：任何一种遵循在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择的算法叫做贪心算法。如此理解原则上没有太大问题，但总觉得不是特别完美。

比如 [动态规划](https://en.wikipedia.org/wiki/Dynamic_programming) 算法实现中出现了 [递归算法](/algorithm/recursion.md),  那是不是也可以说动态规划算法是递归算法？

**是，但不完全是。** 所以要更加准确的判断是哪种算法，还是要站在宏观的角度，整体的把握。

言归正传，我们继续分析贪心算法。

!> 贪心算法旨在将问题分解成子问题来解决，选择每个子问题的最优解来递推到最终问题的最优解。

**那么问题来了，每个子问题的最优解的叠加一定能得到问题的最优解吗？**

**不一定！** 一般情况下，只要一个问题可以通过贪心算法来解决，大概率上贪心算法是解决这个问题的最好办法，也有概率导致 [辛普森悖论](https://en.wikipedia.org/wiki/Simpson%27s_paradox),  出现非最优解。

## 2.哪些问题可以使用贪心法？

严谨的说，判断问题是否可以使用贪心算法并没有一个确定性的判断标准。即便如此，经过人们大量的实践，还是总结了一些经验可以帮助我们初步的判断一个问题是否适合使用贪心算法求解。

判定的依据总结如下：

* **最优子结构性质：**问题的最优解是可以通过原问题的局部最优解推导得到的；
* **贪心选择性质：**问题的局部最优解能够导致全局最优解；
* **无后效性：**问题的求解过程不依赖于之后的决策；

如果一个问题满足上述条件中的一个或者多个，那么就可以使用贪心算法进行求解。当然，此时还只是初步的判断，是否可以得出最优解还需要进行实际的设计和分析。

贪心算法很高效，但遗憾的是对于大部分问题，通常都不能找出最优解。究其原因，是因为贪心算法容易**过早做出决定**，且**不能后退**。通俗的讲就是没有大局观，只顾着局部最优，出现**最优 + 最优  < 次优 + 次优**的情况

## 3.应用

我们选用最经典的 [哈夫曼编码](https://en.wikipedia.org/wiki/Huffman_coding) 问题来体验一下贪心算法的应用，编程语言选用**Python**，我们给文本```Hello World!```j进行编码和解码

### 3.1 定义Node

要得到霍夫曼编码，我们要根据字母的出现频率，出现概率高的字母使用较短的编码，反之出现概率低的则使用较长的编码，这便使编码之后的字符串的平均长度、期望值降低，从而达到无损压缩数据的目的。

```python
class Node:
    def __init__(self, symbol=None, freq=0, left=None, right=None):
        self.symbol = symbol
        self.freq = freq
        self.left = left
        self.right = right
        self.code = ""

    def is_leaf(self):
        return not self.left and not self.right

    def __lt__(self, other):
        return self.freq < other.freq

    def __eq__(self, other):
        return self.symbol == other.symbol and self.freq == other.freq and self.left == other.left and self.right == other.right
```

### 3.2 构造Huffman树

?> 霍夫曼树又称最优二叉树，是一种带权路径长度最短的二叉树。

!> 这里使用到了**collections** 包中的 **defaultdict** ，如需运行代码，可手动导入

```python
def huffman_tree(s):
    # 计算文本中字母的出现频率
    freq = defaultdict(int)
    for c in s:
        freq[c] += 1
    # 根据频率字典生成所有Node节点
    nodes = [Node(symbol=k, freq=f) for k, f in freq.items()]
    # 构造最优二叉树，并寻找根节点
    while len(nodes) > 1:
        # 默认前两个节点为左右节点
        left_node, right_node = nodes[0], nodes[1]
        # 遍历寻找最小的两个节点，最小的为左节点，次小的为右节点
        for node in nodes[2:]:
            if node.freq < right_node.freq:
                if node.freq < left_node.freq:
                    right_node = left_node
                    left_node = node
                else:
                    right_node = node
        # 用两个最小节点构造新节点
        new_node = Node(freq=left_node.freq + right_node.freq, left=left_node, right=right_node)
        # 移除最小左节点
        nodes.remove(left_node)
        # 移除最小右节点
        nodes.remove(right_node)
        # 将新的节点加入集合，参与下一轮寻找最小的两个节点
        nodes.append(new_node)

    # 当集合中的元素仅剩一个时，即为根节点
    return nodes[0]
```

### 3.3 计算Huffman编码

```
# 使用后序递归遍历，左子树补0，右子树补1，为叶子节点计算编码；参数node为根节点
def set_codes(node, code=""):
    node.code = code
    if node.left:
        set_codes(node.left, code + "0")
    if node.right:
        set_codes(node.right, code + "1")
        
# 为方便树的遍历，我们先定义一个遍历方法（后序）,传入根节点
def node_generator(node):
    if node.left:
        yield from node_generator(node.left)
    if node.right:
        yield from node_generator(node.right)
    if node.is_leaf():
        yield node
        
# 开始生成编码,参数为根节点
def huffman_encode(node):
	set_codes(root)
	# 按文本顺序收集每个字母的编码字典
	encoded = {node.symbol: node.code for node in node_generator(root)}
	# 取出每个字母的编码
    encoded_str_list = [encoded[c] for c in s]
    # 生成编码字符串
    encoded_str = "".join(encoded_str_list)
```

运行一下程序，可以得到一下内容：

```bash
各字符的编码为：{'l': '00', 'o': '01', '!': '100', 'H': '1010', 'e': '1011', ' ': '1100', 'W': '1101', 'r': '1110', 'd': '1111'}
编码后的字符串为：1010101100000111001101011110001111100
```



### 3.4 解码

解码就相对简单了，有了上面生成的编码字典，根据字典即可完成解码

```python
def huffman_decode(encoded, s):
    decoded = ""
    i = 0
    while i < len(s):
        for k, v in encoded.items():
            if s[i:].startswith(v):
                decoded += k
                i += len(v)
                break

    return decoded
```



## 4. 总结

在我们生成Huffman编码的过程中，我们使用了一个简单的选择排序算法来实现 **堆** 功能（为了方便理解没使用任何工具包），每次选取当前列表中**频率最小**的两个节点进行合并，得到新的霍夫曼树，重复这个过程直到只剩一个节点为止。

在构建霍夫曼树的过程中，我们使用了 **贪心算法**： 每次合并两个权值最小的节点。
