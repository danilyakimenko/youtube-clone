import { del, list, put } from '@vercel/blob';

type UserId = string;

type UserContent = {
  id: UserId;
  nickname: string;
  password: string;
};

export type UserInfoFromToken = {
  id: UserContent['id'];
  nickname: string;
  iat: number;
}

// -------

type VideoId = string;

type VideoDataContent = {
  userId: string;
  id: VideoId;
  categoryId: string;
};

// -------

const USERS_BLOB_PREFIX = 'db/users';
const VIDEOS_BLOB_PREFIX = 'db/videos';

async function getLatestBlobKey(prefix: string): Promise<string | null> {
  const { blobs } = await list({ prefix });

  if (blobs.length === 0) return null;

  const sortedBlobs = blobs.sort((a, b) =>
    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

  return sortedBlobs[0].pathname;
}

async function getLatestVideosKey(): Promise<string | null> {
  return getLatestBlobKey(VIDEOS_BLOB_PREFIX);
}

async function getLatestUsersKey(): Promise<string | null> {
  return getLatestBlobKey(USERS_BLOB_PREFIX);
}

export async function getUsers(): Promise<Map<UserId, UserContent>> {
  try {
    const latestKey = await getLatestUsersKey();

    if (!latestKey) {
      return new Map();
    }

    const { blobs } = await list({ prefix: USERS_BLOB_PREFIX });
    const blob = blobs.find(b => b.pathname === latestKey);

    if (!blob) {
      return new Map();
    }

    const res = await fetch(blob.url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (!res.ok) throw new Error(`fetch users failed: ${res.status}`);

    const data = await res.json();
    return new Map(Object.entries(data));
  } catch (e) {
    console.error('getUsers error:', e);
    return new Map();
  }
}

export async function saveUsers(users: Map<UserId, UserContent>): Promise<void> {
  const currentUsers = await getUsers();
  const mergedUsers = new Map([...currentUsers, ...users]);
  const data = Object.fromEntries(mergedUsers);

  try {
    const { blobs } = await list({ prefix: USERS_BLOB_PREFIX });
    for (const blob of blobs) {
      await del(blob.url);
    }
  } catch (e) {
    console.error('Error deleting old user versions:', e);
  }

  const timestamp = Date.now();
  const newKey = `${USERS_BLOB_PREFIX}-${timestamp}.json`;

  await put(newKey, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

export async function getVideos(): Promise<Map<VideoId, VideoDataContent>> {
  try {
    const latestKey = await getLatestVideosKey();

    if (!latestKey) {
      const def = initializeVideos();
      await saveVideos(def);
      return def;
    }

    const { blobs } = await list({ prefix: VIDEOS_BLOB_PREFIX });
    const blob = blobs.find(b => b.pathname === latestKey);

    if (!blob) {
      const def = initializeVideos();
      await saveVideos(def);
      return def;
    }

    const res = await fetch(blob.url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      }
    });

    if (!res.ok) throw new Error(`fetch videos failed: ${res.status}`);

    const data = await res.json();
    return new Map(Object.entries(data));
  } catch (e) {
    console.error('getVideos error:', e);
    const def = initializeVideos();
    return def;
  }
}

export async function saveVideos(videos: Map<VideoId, VideoDataContent>): Promise<void> {
  const data = Object.fromEntries(videos);

  try {
    const { blobs } = await list({ prefix: VIDEOS_BLOB_PREFIX });
    for (const blob of blobs) {
      await del(blob.url);
    }
  } catch (e) {
    console.error('Error deleting old versions:', e);
  }

  const timestamp = Date.now();
  const newKey = `${VIDEOS_BLOB_PREFIX}-${timestamp}.json`;

  await put(newKey, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 0,
  });
}

function initializeVideos(): Map<VideoId, VideoDataContent> {
  return new Map<VideoId, VideoDataContent>([
    ['qULWrtxYuxk', { userId: '0', id: 'qULWrtxYuxk', categoryId: 'games'}],
    ['KO-G5DVNlw4', { userId: '0', id: 'KO-G5DVNlw4', categoryId: 'news'}],
    ['tvnpQ0dORI8', { userId: '0', id: 'tvnpQ0dORI8', categoryId: 'news'}],
    ['yNMi0CBJpKA', { userId: '0', id: 'yNMi0CBJpKA', categoryId: 'news'}],
    ['tOMc0XCmuYQ', { userId: '0', id: 'tOMc0XCmuYQ', categoryId: 'music'}],
    ['Vv94is3BZ3I', { userId: '0', id: 'Vv94is3BZ3I', categoryId: 'games'}],
    ['e1pZIfretEs', { userId: '0', id: 'e1pZIfretEs', categoryId: 'music'}],
    ['-lec--FlSJ4', { userId: '0', id: '-lec--FlSJ4', categoryId: 'sport'}],
    ['NnKVD-DZmYQ', { userId: '0', id: 'NnKVD-DZmYQ', categoryId: 'games'}],
    ['mC4GQTy5sqk', { userId: '0', id: 'mC4GQTy5sqk', categoryId: 'sport'}],
    ['iv3U78TaK8w', { userId: '0', id: 'iv3U78TaK8w', categoryId: 'music'}],
    ['ifmWdG3vngA', { userId: '0', id: 'ifmWdG3vngA', categoryId: 'news'}],
  ]);
}
