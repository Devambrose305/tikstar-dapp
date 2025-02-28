import dynamic from 'next/dynamic';

const Web3Test = dynamic(() => import('@/components/Web3Test'), { ssr: false });

export default function TestPage() {
  return <Web3Test />;
} 