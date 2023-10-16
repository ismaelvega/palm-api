import React, { useState } from 'react';
import {marked} from 'marked';

// marked.use(

// )

const MarkdownPreviewer = async ({prompt}) => {
    // const [markdown, setMarkdown] = useState('# Type Markdown here');
    // const [response, setResponse] = useState("");

    const createMarkup = async () => {
      const response = async () => {
        if (prompt.length !== 0) {
          const data = await fetch(`/response?prompt=${prompt}`);
          const response = await data.json();
          console.log(response.data);

          return response.data;
        }
      };

      return { __html: marked(await response())};
    };

    return (
      <div>
        {/* <textarea
          value={markdown}
          onChange={handleInputChange}
          style={{ width: '100%', height: '200px' }}
        /> */}
        <div
          dangerouslySetInnerHTML={await createMarkup()}
          style={{ border: '1px solid #ccc', padding: '10px' }}
        />
      </div>
    );
  };

  export default MarkdownPreviewer;