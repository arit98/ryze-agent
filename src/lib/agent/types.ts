export type ComponentType = 'Button' | 'Card' | 'Input' | 'Table' | 'Modal' | 'Sidebar' | 'Navbar' | 'Chart';

export interface UIComponent {
    id: string;
    type: ComponentType;
    props: Record<string, any>;
    children?: UIComponent[];
}

export interface UIPlan {
    title: string;
    description: string;
    layout: 'single' | 'grid' | 'dashboard' | 'split';
    components: UIComponent[];
    reasoning: string;
}

export interface AgentResponse {
    plan: UIPlan;
    code: string;
    explanation: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    versionId?: string;
}

export interface UIVersion {
    id: string;
    code: string;
    plan: UIPlan;
    explanation: string;
    timestamp: number;
}
