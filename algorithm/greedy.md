# 贪心算法
## 贪心算法的解释

关于贪心算法的解释，网上有众多的版本。这里我们采用 [By Paul E. Black (Fed)](https://www.nist.gov/people/paul-e-black)的说法。 

> A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage.

翻译成人话：任何一种遵循在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择的算法叫做贪心算法。如此理解原则上没有太大问题，但总觉得不是特别完美。

比如[动态规划](https://en.wikipedia.org/wiki/Dynamic_programming)算法实现中出现了[递归算法](/algorithm/recursion.md), 那是不是也可以说动态规划算法是递归算法？**是，但不完全是。** 所以要更加准确的判断使用了哪种算法，还是要站在宏观的角度，整体的把握。

言归正传，

!> 贪心算法旨在将问题分解成子问题来解决，选择每个子问题的最优解来递推到最终问题的最优解。

**那么问题来了，每个子问题的最优解的叠加一定能得到问题的最优解吗？**

**不一定！** 一般情况下，只要一个问题可以通过贪心算法来解决，大概率上贪心算法是解决这个问题的最好办法，也有概率导致[Simpson's Paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox), 出现非最优解。

