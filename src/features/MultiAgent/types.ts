/**
 * 🔧 Multi-Agent System 型定義
 * 世界初のLobeChat Multi-Agent用型定義
 */

// エージェントの役割
export type AgentRole = 
  | 'analyst'      // 分析担当
  | 'writer'       // 執筆担当  
  | 'reviewer'     // レビュー担当
  | 'specialist'   // 専門家
  | 'coordinator'  // 調整役
  | 'researcher';  // 調査担当

// 協力モード
export type CollaborationMode = 
  | 'sequential'   // 順次実行
  | 'parallel'     // 並列実行
  | 'hierarchical' // 階層実行
  | 'democratic';  // 民主的実行

// サポート言語
export type SupportedLanguage = 
  | 'ja'    // 日本語
  | 'en'    // 英語
  | 'auto'; // 自動検出

// タスクの優先度
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

// エージェントの状態
export type AgentStatus = 
  | 'idle'      // 待機中
  | 'working'   // 作業中
  | 'completed' // 完了
  | 'error';    // エラー

// Multi-Agent設定
export interface MultiAgentConfig {
  maxAgents: number;
  primaryModel: string;
  collaborationMode: CollaborationMode;
  language: SupportedLanguage;
  timeout?: number;
  retryCount?: number;
}

// エージェント定義
export interface Agent {
  id: string;
  role: AgentRole;
  model: string;
  instructions: string;
  capabilities: string[];
  status?: AgentStatus;
  priority?: TaskPriority;
}

// タスク定義
export interface MultiAgentTask {
  id: string;
  description: string;
  priority: TaskPriority;
  assignedAgents: string[];
  expectedOutput: string;
  deadline?: Date;
}

// 実行結果
export interface AgentResult {
  agentId: string;
  role: AgentRole;
  input: string;
  output: string;
  executionTime: number;
  status: AgentStatus;
  timestamp: Date;
}

// 協力実行の結果
export interface CollaborationResult {
  taskId: string;
  results: AgentResult[];
  finalOutput: string;
  totalExecutionTime: number;
  success: boolean;
  metadata?: Record<string, any>;
}

// CrewAI統合用
export interface CrewConfig {
  agents: CrewAgent[];
  tasks: CrewTask[];
  process: CollaborationMode;
  verbose?: boolean;
}

export interface CrewAgent {
  role: string;
  goal: string;
  backstory: string;
  tools: string[];
  llm: string;
  maxIter?: number;
  memory?: boolean;
}

export interface CrewTask {
  description: string;
  agent: string;
  expectedOutput: string;
  tools?: string[];
}

// エラー型
export interface MultiAgentError {
  code: string;
  message: string;
  agentId?: string;
  timestamp: Date;
}

// イベント型
export interface MultiAgentEvent {
  type: 'start' | 'progress' | 'complete' | 'error';
  agentId?: string;
  message: string;
  data?: any;
  timestamp: Date;
}

// 統計情報
export interface MultiAgentStats {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageExecutionTime: number;
  agentUtilization: Record<string, number>;
}