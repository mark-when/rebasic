import { AT_REGEX } from "@markwhen/parser/lib/Types";
export const LINK_REGEX =
  /\[([^\]\<\>]+)\]\(((https?:\/\/)?[\w\d./\&\?=\-#:,_]+)\)/g;

export function innerHtml(s: string): string {
  return s
    .replace(/<|>/g, (match) => (match === "<" ? "&lt;" : "&gt;"))
    .replace(LINK_REGEX, (substring, linkText, link) => linkText)
    .replace(/&/g, "&amp;")
    .replace(/@/g, "&#64;");
}

export function toInnerHtml(s: string): string {
  return s
    .replace(/<|>/g, (match) => (match === "<" ? "&lt;" : "&gt;"))
    .replace(LINK_REGEX, (substring, linkText, link) => {
      return `<a class="underline" href="${addHttpIfNeeded(
        link
      )}">${linkText}</a>`;
    })
    .replace(/&/g, "&amp;")
    .replace(AT_REGEX, (substring, at) => {
      return `<a class="underline" href="/${at}">@${at}</a>`;
    });
}

export function addHttpIfNeeded(s: string): string {
  if (
    s.startsWith("http://") ||
    s.startsWith("https://") ||
    s.startsWith("/")
  ) {
    return s;
  }
  return `http://${s}`;
}
