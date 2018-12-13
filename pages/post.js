// This is the Link API
import {withRouter} from 'next/router'
import Markdown from "react-markdown";

const Post = withRouter((props) => (
  <div>
    <h1>Title: {props.router.query.title}</h1>
    <div className="markdown">
      <Markdown
        source={
                props.content
              }
        />
    </div>
    <style jsx global>{`
      .markdown {
        font-family: "Arial";
      }
      .markdown a {
        text-decoration: none;
        color: red;
      }
      .markdown a:hover {
        opacity: 0.6;
      }
      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </div>
));
export default Post
