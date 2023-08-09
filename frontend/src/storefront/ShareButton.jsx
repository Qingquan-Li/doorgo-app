import { useLocation } from 'react-router-dom';

export default function ShareButton({ title }) {
  const location = useLocation();

  const share = () => {
    const currentUrl = window.location.origin + location.pathname + location.search;

    if (navigator.share) {
      navigator.share({
        title: title,
        // text: 'Check out this storefront data!',
        url: currentUrl
      }).catch(error => {
        console.error('Something went wrong sharing the content', error);
      });
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('URL copied to clipboard!');
      }).catch(err => {
        alert('Failed to copy URL: ', err);
      });
    }
  };

  return (
    <button onClick={share} className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded">
      Share this Page
    </button>
  );
}
