"use client"
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

interface TagInputProps {
  maxTags?: number;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  maxTags = 3,
  borderColor = "border-gray-300",
  bgColor = "bg-green-500",
  textColor = "text-white"
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && inputValue.length <= 20 && tags.length < maxTags) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const handleRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [tags]);

  return (
    <div
      className={classNames(
        "flex flex-wrap items-center min-h-[50px] px-3 py-2 border-none bg-white rounded-lg w-[80%]",
        
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, i) => (
        <div
          key={i}
          className={classNames(
            "flex items-center h-[35px] px-2 mr-2 mb-1 rounded-lg cursor-pointer border text-xs xl:text-sm font-dm-sans",
            bgColor,
            borderColor,
            textColor
          )}
        >
          {tag}
          <span
            className="ml-2 text-sm hover:scale-125 transition-transform"
            onClick={() => handleRemove(i)}
          >
            &times;
          </span>
        </div>
      ))}
      {tags.length < maxTags && (
        <input
          type="text"
          ref={inputRef}
          className="flex-grow outline-none border-none font-dm-sans text-xs xl:text-sm py-1 px-2 min-w-[100px]"
          placeholder="Enter new tag..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default TagInput;
