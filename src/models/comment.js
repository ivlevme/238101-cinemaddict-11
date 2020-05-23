export default class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.emoji = data[`emotion`];
    this.text = data[`comment`];
    this.author = data[`author`];
    this.date = new Date(data[`date`]);
  }

  toRAW() {
    return {
      "comment": this.text,
      "date": this.date.toISOString(),
      "emotion": this.emoji,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
