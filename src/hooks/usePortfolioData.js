import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContext';

export default function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioProvider');
  }
  return context;
}
