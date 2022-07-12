import DefaultHttpTransport from '@frontend/core/default-http-transport';
import HttpTransport from '@frontend/core/http-transport';
import { selectUserInfo } from '@frontend/src/selectors/user';
import store from '@frontend/src/store/store';

const LEADERBOARD_API_URL = 'https://ya-praktikum.tech/api/v2/leaderboard';
const TEAM_NAME = 'vegas14';

type GetLeadersRequest = {
  ratingFieldName: string,
  cursor: number,
  limit: number,
};

type Leader = {
  data: {
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
    // TODO: refactor to selectors
    const user = selectUserInfo(store.getState());
    const request: LeaderSetRequest = {
      ratingFieldName: 'score',
      teamName: `${TEAM_NAME}`,
      data: {
        name: user.display_name !== undefined ? user.display_name : user.login,
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

if (typeof window === 'object') {
// @ts-ignore
  window.LB = LeaderboardServiceSingleton;
}


export default LeaderboardServiceSingleton
