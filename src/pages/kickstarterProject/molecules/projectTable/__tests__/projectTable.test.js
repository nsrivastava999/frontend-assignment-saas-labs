import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTable from '../ProjectTable';

const mockProjects = [
  { id: 1, 'percentage.funded': 80, 'amt.pledged': 2000 },
  { id: 2, 'percentage.funded': 70, 'amt.pledged': 1500 },
  { id: 3, 'percentage.funded': 90, 'amt.pledged': 3000 },
  { id: 4, 'percentage.funded': 60, 'amt.pledged': 1000 },
  { id: 5, 'percentage.funded': 50, 'amt.pledged': 500 },
  { id: 6, 'percentage.funded': 40, 'amt.pledged': 400 },
];

describe('ProjectTable Component', () => {
  test('renders table with data', () => {
    render(<ProjectTable projects={mockProjects} />);

    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage Funded')).toBeInTheDocument();
    expect(screen.getByText('Amount Pledged')).toBeInTheDocument();

    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
  });

  test('handles pagination correctly', () => {
    render(<ProjectTable projects={mockProjects} />);

    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('400')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('80%')).toBeInTheDocument();
  });
});

