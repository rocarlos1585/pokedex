import { createContext, type ReactNode, useContext } from 'react';
import { Dependencies } from './container';

const DependenciesContext = createContext<Dependencies | null>(null);

interface DependenciesProviderProps {
  readonly dependencies: Dependencies;
  readonly children: ReactNode;
}

export function DependenciesProvider({ dependencies, children }: DependenciesProviderProps) {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}

export function useDependencies(): Dependencies {
  const dependencies = useContext(DependenciesContext);
  if (!dependencies) {
    throw new Error('useDependencies must be used within a DependenciesProvider');
  }
  return dependencies;
}