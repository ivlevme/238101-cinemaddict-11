import AbstractComponent from "./abstract-component.js";


const createCommentsErrorTemplate = () => {
  return (`
    <li>Unfortunately, loading comments failed :(</li>
  `).trim();
};


export default class CommentsError extends AbstractComponent {
  getTemplate() {
    return createCommentsErrorTemplate();
  }
}
