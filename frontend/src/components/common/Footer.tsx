import { Toolbar, Typography, Box, IconButton, Divider } from '@mui/material';
import { Email as MailOutlineIcon, Facebook as FacebookIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';

const Footer = () => {
  const locationUrl = "https://www.google.com/maps/search/?api=1&query=immeuble+Baraka2,+3eme+etage,+face+à+la+délégation+de+Monastir,+MONASTIR,+TUNISIA";

  return (
    <footer
      style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0',
        width: '100%',
        textAlign: 'center',
        boxSizing: 'border-box',
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: '300px',
        height:'auto'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: '10px', sm: '20px' },
          width: '100%',
          boxSizing: 'border-box',
          margin: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: { xs: '10px', sm: '12px' },
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          &copy; {new Date().getFullYear()} WeDev Minds. All rights reserved.
        </Typography>
        <Divider
          sx={{
            backgroundColor: 'white',
            width: { xs: '90%', sm: '80%' },
            margin: '0 auto',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: { xs: '8px', sm: '12px' },
            width: '100%',
            boxSizing: 'border-box',
            margin: '10px 0',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="facebook"
            href="https://www.facebook.com/profile.php?id=61559286274565&mibextid=ZbWKwL"
            target="_blank"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="whatsapp"
            href="https://wa.me/21692537806"
            target="_blank"
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="gmail"
            href="mailto:wedevminds@hotmail.com"
          >
            <MailOutlineIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '14px', sm: '16px' },
              '& a': {
                fontSize: { xs: '14px', sm: '16px' },
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
              },
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <a
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Immeuble Baraka2, 3eme etage, face à la délégation de Monastir, MONASTIR, TUNISIA
            </a>
          </Typography>
        </Box>
      </Toolbar>
    </footer>
  );
};

export default Footer;
