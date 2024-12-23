import { Fragment } from "react";

interface Props {
  content: string;
}

export default function FacebookBody({ content }: Props) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/;
  const isUrl = (word: string) => urlRegex.test(word);

  return (
    <div className="text-sm break-words">
      {content.split("\n").map((line, index) => (
        <Fragment key={index}>
          {line.split(" ").map((word, wordIndex) => (
            <Fragment key={wordIndex}>
              {word.includes("#") ? (
                <>
                  {word.substring(0, word.indexOf("#"))}
                  <span className="font-bold text-blue-400">{word.substring(word.indexOf("#"))}</span>{" "}
                </>
              ) : isUrl(word) ? (
                <span className="font-bold text-blue-400">{word} </span>
              ) : (
                word + " "
              )}
            </Fragment>
          ))}
          <br />
        </Fragment>
      ))}
    </div>
  );
}
