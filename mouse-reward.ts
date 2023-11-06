// 有两只老鼠，k 个起司，一个起司对应一个interge数值奖励
// 场景为第一个老鼠能吃 k 个起司，第二个老鼠能吃完所有剩下的起司，计算并返回两只老鼠可以奖励的最大数值
// 限制：一个老鼠每次只能吃一个起司，每块起司对每个老鼠的数值奖励不一致
// 函数有 3 个 input
// input1: 第一个老鼠对每个位置的吃的起司奖励 cheesy reward1 : [1,1,3,4]
// input2: 第二个老鼠对每个位置的吃的起司奖励 cheesy reward2 : [4,4,1,1]
// input3: 第一个老鼠可以吃的起司的个数: k = 2,
// output: 15  

/*
  input: matrix = [
    [2,3,4,5,6],
    [1,1,1,1,1]
  ]
  k = 2

  第二个的老鼠可以把所有吃完
  output: 5 + 6 + 1 + 1 + 1
*/
let result = 0;

function maxPoint(reward1: Array<number>, reward2: Array<number>, k: number) {
  backtracking(reward1, reward2, k, [], 0);
  return result;
}

// path: reward1 所有的 index
function backtracking(
  reward1: Array<number>,
  reward2: Array<number>,
  k: number,
  path: Array<number>,
  start: number
) {
  if (path.length === k) {
    result = Math.max(
      result,
      reward1
        .filter((r, index) => path.includes(index))
        .reduce((sum, prev) => sum + prev, 0) +
        reward2
          .filter((r, index) => !path.includes(index))
          .reduce((sum, prev) => sum + prev, 0)
    );
    console.log(result, path.slice());
    return;
  }

  for (let i = 0; i < reward1.length; i++) {
    path.push(i);
    backtracking(reward1, reward2, k, path, i + 1);
    path.pop();
  }
}

console.log();

/*
  Time: O(k + k - 1 .. + 1) = O() n * (n - k)
  input: [2,3,4,5,6], [1,1,1,1,1]
  case:
    1. mouse1 = 2,  
*/
console.log(maxPoint([2, 3, 4, 5, 6], [1, 1, 1, 1, 1], 3), 14, "case1");
console.log(maxPoint([1, 1, 3, 4], [4, 4, 1, 1], 2), 15, "case2");


function maxCheeseReward(cheesyReward1: number[], cheesyReward2: number[], k: number): number {
    const m = cheesyReward1.length;
    const n = cheesyReward2.length;
    const dp: number[][] = [];

    for (let i = 0; i <= k; i++) {
        dp.push(new Array(k + 1).fill(0));
    }

    for (let i = 1; i <= k; i++) {
        for (let j = 1; j <= k; j++) {
            dp[i][j] = Math.max(dp[i-1][j] + cheesyReward1[i-1], dp[i][j-1] + cheesyReward2[j-1]);
        }
    }

    return dp[k][k];
}

const cheesyReward1 = [1, 1, 3, 4];
const cheesyReward2 = [4, 4, 1, 1];
const k = 2;

const maxReward = maxCheeseReward(cheesyReward1, cheesyReward2, k);
console.log(maxReward); // 输出 15
