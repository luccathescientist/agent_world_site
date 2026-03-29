export interface World {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  game_state: Record<string, unknown> | null;
  screenshot_url: string | null;
  created_at: string;
  // joined from auth.users via profiles (future)
  author_email?: string;
}
