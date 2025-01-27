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
