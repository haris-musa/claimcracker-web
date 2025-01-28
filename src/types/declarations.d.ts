declare module "mammoth" {
  interface ConversionResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
      paragraph?: number;
    }>;
  }

  interface Options {
    styleMap?: string[];
    includeDefaultStyleMap?: boolean;
    includeEmbeddedStyleMap?: boolean;
    convertImage?: (image: {
      contentType: string;
      buffer: Buffer;
    }) => Promise<{ src: string }>;
    ignoreEmptyParagraphs?: boolean;
    idPrefix?: string;
    arrayBuffer?: ArrayBuffer;
    buffer?: Buffer;
    path?: string;
  }

  function extractRawText(options: Options): Promise<ConversionResult>;

  export = {
    extractRawText,
  };
}

declare module "pdf-parse-fork" {
  interface PDFData {
    text: string;
    numpages: number;
    info: {
      PDFFormatVersion: string;
      IsAcroFormPresent: boolean;
      IsXFAPresent: boolean;
      [key: string]: string | number | boolean | null;
    };
    metadata: {
      [key: string]: string | number | boolean | null;
    };
    version: string;
  }

  function pdfParse(dataBuffer: Buffer | ArrayBuffer): Promise<PDFData>;

  export = pdfParse;
}
