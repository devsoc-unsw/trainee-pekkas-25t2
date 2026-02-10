import styles from './PokemonElementTag.module.css'

type PokemonElementTagProps = {
  element: string
}

function PokemonElementTag({ element }: PokemonElementTagProps) {
  const getTagColour = (element: string): string => {
    element = element.toLowerCase()

    const colours: Record<string, string> = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
    };

    return colours[element] || 'gray';
  }

  const getContrastingTextColour = (bg: string) => {
    const r = parseInt(bg.slice(1, 3), 16);
    const g = parseInt(bg.slice(3, 5), 16);
    const b = parseInt(bg.slice(5, 7), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 186 ? 'black' : 'white';
  }

  return (
    <span 
    className={styles.elementTag}
    style={{ 
      color: getContrastingTextColour(getTagColour(element)),
      backgroundColor: getTagColour(element)
    }}>
      {element.toUpperCase()}
    </span>
  )
}

export default PokemonElementTag