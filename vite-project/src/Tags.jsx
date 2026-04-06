import React from "react";
import { tags } from "./data/tags";
function Tags({ onTagClick }) {


    return (
        <ul>
            {tags.map((tag) => (
                <li key={tag.id} className="tag p-2" onClick={() => onTagClick(tag)}>
                    {tag.title}
                </li>
            ))}
        </ul>
    )
}

export default Tags