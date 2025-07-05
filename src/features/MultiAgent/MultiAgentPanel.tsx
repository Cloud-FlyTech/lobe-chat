/**
 * 🎨 Multi-Agent UI Panel
 * 世界初：Multi-Agent チャットボットのUI
 */

import React, { useState } from 'react';
import { Button, Card, Spin, Typography, Tag } from 'antd';
import { RobotOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { MultiAgentOrchestrator, DEFAULT_CONFIG, Agent } from './index';
import { CrewAIIntegration } from './CrewAI';

const { Title, Text, Paragraph } = Typography;

interface MultiAgentPanelProps {
  onResult?: (result: string) => void;
}

export const MultiAgentPanel: React.FC<MultiAgentPanelProps> = ({ onResult }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [result, setResult] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<string>('');

  /**
   * 🚀 Multi-Agent システム実行
   */
  const executeMultiAgent = async (task: string) => {
    setIsRunning(true);
    setResult('');
    
    try {
      // Multi-Agent システム初期化
      const orchestrator = new MultiAgentOrchestrator(DEFAULT_CONFIG);
      
      // チーム作成
      setCurrentStep('チーム編成中...');
      const team = await orchestrator.createTeam(task);
      setAgents(team);
      
      // 協力実行
      setCurrentStep('エージェント協力実行中...');
      const finalResult = await orchestrator.collaborate(task);
      
      setResult(finalResult);
      onResult?.(finalResult);
      setCurrentStep('完了！');
      
    } catch (error) {
      console.error('Multi-Agent execution failed:', error);
      setResult('エラーが発生しました');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          <Title level={2}>🌍 世界初 Multi-Agent System</Title>
          <Paragraph>
            複数のAIエージェントが協力してタスクを解決します
          </Paragraph>
        </div>

        {/* エージェントチーム表示 */}
        {agents.length > 0 && (
          <Card 
            title="🤖 Active Agent Team" 
            style={{ marginBottom: '16px' }}
            size="small"
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {agents.map(agent => (
                <Tag 
                  key={agent.id}
                  icon={<RobotOutlined />}
                  color="blue"
                >
                  {agent.role} ({agent.model})
                </Tag>
              ))}
            </div>
          </Card>
        )}

        {/* 実行状態 */}
        {isRunning && (
          <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Text strong>{currentStep}</Text>
            </div>
          </Card>
        )}

        {/* 実行ボタン */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={() => executeMultiAgent('テストタスクを実行')}
            loading={isRunning}
          >
            Multi-Agent 実行
          </Button>
        </div>

        {/* 結果表示 */}
        {result && (
          <Card 
            title="🎯 Multi-Agent 実行結果"
            style={{ marginTop: '16px' }}
          >
            <Paragraph>
              {result}
            </Paragraph>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default MultiAgentPanel;