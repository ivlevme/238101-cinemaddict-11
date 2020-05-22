import AbstractComponent from "./abstract-component.js";


const createCommentsLoadingTemplate = () => {
  return (`
    <li>Loading...</li>
  `).trim();
};


export default class CommentsLoading extends AbstractComponent {
  getTemplate() {
    return createCommentsLoadingTemplate();
  }
}
