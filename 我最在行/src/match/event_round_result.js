const QuestionModel = require('../common/question_model')
const event_battle_start = require('./event_battle_start')

module.exports = async (socket, data) => {
  // data 会返回上一题的答案、下一题的题目和选项

  // 如果题库没有，组合题目和答案，入库
  if (!await QuestionModel.findOne({question: socket._question.question})) {
    console.log(
      '保存到题库',
      JSON.stringify(await new QuestionModel({
        ...socket._question,
        answer: data.results.answer
      }).save())
    )
  }

  // 除了返回结果，也会同时返回下一题的题目，处理方式跟 star 一致
  await event_battle_start(socket, data)
}

