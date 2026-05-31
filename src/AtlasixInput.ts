import { AtlasixInputEdge } from "./AtlasixInputEdge";
import { AtlasixInputNode } from "./AtlasixInputNode";

export class AtlasixInput {
  backgroundColor: string;
  nodes: AtlasixInputNode[];
  edges: AtlasixInputEdge[];

  constructor(
    backgroundColor: string = "white",
    nodes: AtlasixInputNode[] = [],
    edges: AtlasixInputEdge[] = []
  ) {
    this.backgroundColor = backgroundColor;
    this.nodes = nodes;
    this.edges = edges;
  }

  static fromJson(json: any) {
    return new AtlasixInput(
        json.backgroundColor,
        json.nodes?.map((node: any) => AtlasixInputNode.fromJson(node)) ?? [],
        json.edges?.map((node: any) => AtlasixInputEdge.fromJson(node)) ?? []
    );
  }
}
