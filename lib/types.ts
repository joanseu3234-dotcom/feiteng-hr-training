export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "info" | "warning" | "tip" | "important" | "note";
      title?: string;
      text: string;
    }
  | { type: "code"; text: string };

export type AttachmentType =
  | "pdf"
  | "docx"
  | "xlsx"
  | "pptx"
  | "video"
  | "link";

export interface Attachment {
  filename: string; // 對應 public/files/ 內檔名；video/link 可為空
  displayName: string;
  description?: string;
  type: AttachmentType;
  externalUrl?: string; // 若為外部連結或影片
  note?: string; // 例如 "請至內部網路觀看"
}

export interface Section {
  id: string;
  heading: string;
  source?: string; // 來源資料說明
  blocks: Block[];
  attachments?: Attachment[];
}

export interface Chapter {
  slug: string;
  number: string; // "第一章" etc.
  title: string;
  summary: string;
  sections: Section[];
  attachments?: Attachment[];
}
