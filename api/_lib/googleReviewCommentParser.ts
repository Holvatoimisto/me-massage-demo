export interface ParsedGoogleReviewComment {
  rawText: string;
  text: string;
  originalTextExtracted: boolean;
}

const TRANSLATED_ORIGINAL_COMMENT_PATTERN =
  /^\(Translated by Google\) ([\s\S]+)\n\n\(Original\)\n([\s\S]+)$/;

export function parseGoogleReviewComment(rawText: string): ParsedGoogleReviewComment {
  const match = TRANSLATED_ORIGINAL_COMMENT_PATTERN.exec(rawText);

  if (!match || match[1].trim().length === 0 || match[2].trim().length === 0) {
    return { rawText, text: rawText, originalTextExtracted: false };
  }

  return { rawText, text: match[2], originalTextExtracted: true };
}
