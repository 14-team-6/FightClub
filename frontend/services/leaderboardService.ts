import DefaultHttpTransport from '@frontend/core/default-http-transport';
import HttpTransport from '@frontend/core/http-transport';

const LEADERBOARD_API_URL = 'https://ya-praktikum.tech/api/v2/leaderboard';
const TEAM_NAME = 'vegas14';

type GetLeadersRequest = {
  ratingFieldName: string,
  cursor: number,
  limit: number,
};

type Leader = {
  data: {
    login: string,
    name: string,
    score: number,
    teamName: string,
  },
};

type GetLeadersResponse = Leader[];

type LeaderSetRequest = Leader & {
  ratingFieldName: string,
  teamName: string,
};

export type SetLeaderError = {
  reason: string;
}

class LeaderboardService {
  private readonly httpTransport: HttpTransport;

  constructor(httpTransport: HttpTransport) {
    this.httpTransport = httpTransport;
  }

  private getLeadersHandler(response: Response): Promise<GetLeadersResponse> {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.json());
  }

  private async setLeaderHandler(response: Response): Promise<string | SetLeaderError> {
    if (response.ok) {
      return response.text();
    }
    return Promise.reject(await response.json());
  }

  public getLeaders() {
    const request: GetLeadersRequest = {
      ratingFieldName: 'score',
      limit: 10,
      cursor: 0,
    };
    return this.httpTransport.post<GetLeadersRequest, GetLeadersResponse>(`/${TEAM_NAME}`, {
      body: request,
      handler: this.getLeadersHandler,
    });
  }

  public setLeader(score: number) {
    const request: LeaderSetRequest = {
      ratingFieldName: 'score',
      teamName: `${TEAM_NAME}`,
      data: {
        login: 'catfighter', // get from store
        name: 'Stan', // get from store
        score,
        teamName: `${TEAM_NAME}`,
      }
    };
    return this.httpTransport.post<LeaderSetRequest, string | SetLeaderError>(``, {
      body: request,
      handler: this.setLeaderHandler,
    });
  }
}

const LeaderboardServiceSingleton = new LeaderboardService(new DefaultHttpTransport(LEADERBOARD_API_URL));

// @ts-ignore
window.LB = LeaderboardServiceSingleton;

export default LeaderboardServiceSingleton
