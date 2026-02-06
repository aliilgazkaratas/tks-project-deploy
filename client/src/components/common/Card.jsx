import './Card.css';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  padding = true
}) => {
  const cardClass = `card ${hover ? 'card-hover' : ''} ${
    !padding ? 'card-no-padding' : ''
  } ${onClick ? 'card-clickable' : ''} ${className}`;

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;