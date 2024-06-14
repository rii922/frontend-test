import * as Recoil from 'recoil';
import { AxiosResponse } from 'axios';

export interface QiitaResponseArticle {
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: {
    created_at: string;
    description: string;
    name: string;
    private: boolean;
    updated_at: string;
    url_name: string;
  };
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stocks_count: number;
  tags: Array<{
    name: string;
    versions: string[];
  }>;
  title: string;
  updated_at: string;
  url: string;
  user: {
    description: string | null;
    facebook_id: string | null;
    followees_count: number;
    followers_count: number;
    github_login_name: string | null;
    id: string;
    items_count: number;
    linkedin_id: string | null;
    location: string | null;
    name: string | null;
    organization: string | null;
    permanent_id: number;
    profile_image_url: string;
    team_only: boolean;
    twitter_screen_name: string | null;
    website_url: string | null;
  };
  page_views_count: number | null;
  team_membership: {
    description: string;
    email: string;
    id: string;
    last_accessed_at: string;
    name: string;
  };
  organization_url_name: string | null;
  slide: boolean;
}

export const responseState = Recoil.atom<AxiosResponse<QiitaResponseArticle[]> | null>({
  key: 'response',
  default: null,
});
export const dataSelector = Recoil.selector<QiitaResponseArticle[] | null>({
  key: 'data',
  get: ({ get }) => get(responseState)?.data ?? null,
});
