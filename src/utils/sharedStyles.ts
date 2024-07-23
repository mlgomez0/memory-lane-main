import { CSSObject } from '@mui/system'

export const sharedStyles:CSSObject  = {
  backgroundColor: 'white',
  border: '1px solid #D1D5DB',
  fontFamily: 'Arial',
  height:'40px',
  fontSize: 'medium',
  color: '#4B5563',
  borderRadius: '0.375rem',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#F9FAFB',
  }
}
