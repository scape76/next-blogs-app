export class Content {
  time: number;
  blocks: Block[];
  version: string;
}

class Block {
  id: string;
  data: any;
  type: string;
}
