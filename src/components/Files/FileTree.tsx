import React, { useState } from "react";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
  size?: string;
  modified?: string;
  preview?: string;
};

export default function FileTree({ root, onSelect }: { root: FileNode[]; onSelect: (f: FileNode) => void }) {
  return <div className="file-tree" role="tree">{root.map((n) => <TreeNode key={n.path} node={n} onSelect={onSelect} />)}</div>;
}

function TreeNode({ node, onSelect }: { node: FileNode; onSelect: (f: FileNode) => void }) {
  const [open, setOpen] = useState(false);
  const hasKids = node.type === "folder" && node.children && node.children.length > 0;
  return (
    <div role="treeitem" aria-expanded={hasKids ? open : undefined} style={{marginLeft:4}}>
      <div className="tree-node" onClick={() => { if (hasKids) setOpen(!open); else onSelect(node); }} tabIndex={0}>
        <div style={{width:18, textAlign:"center"}}>{hasKids ? (open ? "▾" : "▸") : "•"}</div>
        <div style={{flex:1}}>{node.name}</div>
        <div style={{fontSize:12, color:"var(--muted)"}}>{node.type === "file" ? node.size : ""}</div>
      </div>
      {hasKids && open && (
        <div style={{marginLeft:10}}>
          {node.children!.map((c) => <TreeNode key={c.path} node={c} onSelect={onSelect} />)}
        </div>
      )}
    </div>
  );
}