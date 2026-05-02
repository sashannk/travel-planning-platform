const fallbackDestinations = [
  {
    id: 'fallback-banff',
    title: 'Banff Alpine Escape',
    location: 'Canada',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fallback-santorini',
    title: 'Santorini Blue Hour',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fallback-kyoto',
    title: 'Kyoto Garden Trail',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fallback-iceland',
    title: 'Iceland Ring Road',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fallback-morocco',
    title: 'Marrakesh Market Stay',
    location: 'Morocco',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'fallback-bali',
    title: 'Bali Rice Terrace Nest',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  },
];

const toDestination = (photo) => ({
  id: photo.id,
  title: photo.alt_description || photo.description || 'Curated travel find',
  location: photo.user?.location || 'WanderNest pick',
  image: photo.urls?.regular,
});

export async function fetchTravelImages(query = 'travel destination') {
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return fallbackDestinations;
  }

  const url = new URL('https://api.unsplash.com/photos/random');
  url.searchParams.set('query', query);
  url.searchParams.set('count', '9');
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('client_id', accessKey);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to load destinations from Unsplash.');
  }

  const photos = await response.json();
  return photos.map(toDestination).filter((destination) => destination.image);
}
