import ExampleTheme from "./themes/ExampleTheme"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import TreeViewPlugin from "./plugins/TreeViewPlugin"
import ToolbarPlugin from "./plugins/ToolbarPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin"

import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { TRANSFORMERS } from "@lexical/markdown"

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"
import AutoLinkPlugin from "./plugins/AutoLinkPlugin"

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>
}

export default function Editor({ onChange, state = null }) {
  const editorConfig = {
    editorState: state,
    // editable: false,
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error) {
      throw error
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <LinkPlugin />
          <TabIndentationPlugin />
          <AutoLinkPlugin />
          <OnChangePlugin onChange={onChange} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  )
}
