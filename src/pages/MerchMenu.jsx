import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const MerchMenu = () => {
  const linkStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    maxWidth: '100%',
    color: '#555',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  };

  const listStyle = {
    paddingLeft: 0,
    listStyleType: 'none',
  };

  const headingStyle = {
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '12px',
  };

  const columnStyle = {
    marginBottom: '24px',
  };

  const slideInVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="container my-4">
      <div className="row">
        {/* Chaussures Hommes */}
        <motion.div
          className="col-12 col-md-3"
          style={columnStyle}
          variants={slideInVariant}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h5 style={headingStyle}>Chaussures Hommes</h5>
          <ul style={listStyle}>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/noir-running-chaussures-37v7jz90poyzy7ok">Chaussures de running noires</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/blanc-running-chaussures-37v7jz4g797zy7ok">Chaussures de running blanches</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/chaussures-y7ok">Chaussures Nike P-6000</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/nike-initiator-7ji49">Nike Initiator</a></li>
          </ul>
        </motion.div>

        {/* Chaussures Femmes */}
        <motion.div
          className="col-12 col-md-3"
          style={columnStyle}
          variants={slideInVariant}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h5 style={headingStyle}>Chaussures Femmes</h5>
          <ul style={listStyle}>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/yoga-pantalons-et-leggings-2kq19zanrlj">Pantalons de yoga</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/tech-fleece-pantalons-survetement-joggers-6sipkzaepf0">Pantalons Tech Fleece</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/tech-fleece-vetements-6sipkz6ymx6">Tech Fleece</a></li>
          </ul>
        </motion.div>

        {/* Enfant */}
        <motion.div
          className="col-12 col-md-3"
          style={columnStyle}
          variants={slideInVariant}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h5 style={headingStyle}>Chaussures Enfants</h5>
          <ul style={listStyle}>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/filles-noir-chaussures-3aqegz90poyzy7ok">Chaussures noires fille</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/kids-noir-chaussures-90poyzv4dhzy7ok">Chaussures noires enfant</a></li>
          </ul>
        </motion.div>

        {/* Articles du moment */}
        <motion.div
          className="col-12 col-md-3"
          style={columnStyle}
          variants={slideInVariant}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h5 style={headingStyle}>Articles Tendance</h5>
          <ul style={listStyle}>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/clubs-de-football-nationaux-6fu9q">Clubs de football</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/football-1gdj0">Football</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/w/8p57d">Nike England</a></li>
            <li><a style={linkStyle} href="https://www.nike.com/fr/nrc-app">Nike Run Club</a></li>
          </ul>
        </motion.div>
      </div>

      {/* Hover effect pour les liens */}
      <style>{`
        a:hover {
          color: #000 !important;
        }
      `}</style>
    </div>
  );
};

export default MerchMenu;
