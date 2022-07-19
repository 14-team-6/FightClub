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

export type LeaderItem = {
  id: number,
  name: string,
  score: number,
};

type LeaderResponse = {
  data: LeaderItem & { teamName: string }
};

type GetLeadersResponse = LeaderResponse[];

type LeaderSetRequest = LeaderResponse & {
  ratingFieldName: string,
  teamName: string,
};

export type SetLeaderError = {
  reason: string;
};

class LeaderboardService {
  private readonly httpTransport: HttpTransport;

  constructor(httpTransport: HttpTransport) {
    this.httpTransport = httpTransport;
  }

  private getLeadersHandler(response: Response): Promise<LeaderItem[]> {
    if (response.ok) {
      return response.json().then((items: GetLeadersResponse) => items.map((element: LeaderResponse) => {
        const res: LeaderItem = {
          id: element.data.id,
          name: element.data.name,
          score: element.data.score,
        };
        return res;
      }));
    }
    return Promise.reject(response.json());
  }

  private async setLeaderHandler(response: Response): Promise<string | SetLeaderError> {
    if (response.ok) {
      return response.text();
    }
    return Promise.reject(await response.json());
  }

  public getLeaders(): Promise<LeaderItem[]> {
    const request: GetLeadersRequest = {
      ratingFieldName: 'score',
      limit: 10,
      cursor: 0,
    };
    return this.httpTransport.post<GetLeadersRequest, LeaderItem[]>(`/${TEAM_NAME}`, {
      body: request,
      handler: this.getLeadersHandler,
    });
  }

  public setLeader(score: number): Promise<string | SetLeaderError> {
    // TODO: refactor to selectors
    const user = selectUserInfo(store.getState());
    return this.getLeaders().then((data: LeaderItem[]) => {
      const scoreRecords = data.filter((item) => item.id === user.id);
      const oldScore = scoreRecords.length === 0 ? 0 : scoreRecords[0].score;
      const request: LeaderSetRequest = {
        ratingFieldName: 'score',
        teamName: `${TEAM_NAME}`,
        data: {
          id: user.id as number,
          name: user.display_name !== undefined ? user.display_name : user.login,
          score: score + oldScore,
          teamName: `${TEAM_NAME}`,
        },
      };
      return this.httpTransport.post<LeaderSetRequest, string | SetLeaderError>('', {
        body: request,
        handler: this.setLeaderHandler,
      });
    });
  }
}

const LeaderboardServiceSingleton = new LeaderboardService(new DefaultHttpTransport(LEADERBOARD_API_URL));

export default LeaderboardServiceSingleton;
