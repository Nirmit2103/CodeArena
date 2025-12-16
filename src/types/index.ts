export interface Room {
  id: string;
  name: string;
  description: string;
  members: number;
  currentSong?: {
    title: string;
    artist: string;
  };
  isPlaying?: boolean;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  teamSize: number;
  currentMembers: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Open' | 'In Progress' | 'Completed';
}

export interface Tournament {
  id: string;
  title: string;
  platform: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  url: string;
  type: 'Competition' | 'Hackathon';
  participantCount: number;
  description: string;
  duration: string;
  status: string;
  inTwentyFourHours: boolean;
  phase: string;
  difficulty: string;
} 