export const dedupeShowsById = (shows = []) => {
  const map = new Map();

  shows.forEach((show) => {
    if (show?.id && !map.has(show.id)) {
      map.set(show.id, show);
    }
  });

  return Array.from(map.values());
};
