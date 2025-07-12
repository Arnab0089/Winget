const tableStyle = {
  header: {
    style: {
      backgroundColor: '#F4F4FC',
      color: '#1B1A55',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '12px ',
    },
  },

  headRow: {
    style: {
      backgroundColor: '#535C91',
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      minHeight: '56px',
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
    },
  },
  headCells: {
    style: {
      borderBottom: '1px solid #E5E7EB',
      borderRight: '1px solid #E5E7EB',
      padding: '12px',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  },
  rows: {
    style: {
      backgroundColor: '#F4F4FC',
      color: '#1B1A55',
      minHeight: '60px',
      borderBottom: '1px solid #E5E7EB',
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #E5E7EB',
      },
      '&:hover': {
        backgroundColor: '#E0E7FF',
      },
    },
  },
  cells: {
    style: {
      borderRight: '1px solid #E5E7EB',
      padding: '12px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      textAlign: 'center',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#1B1A55',
      color: 'white',
      borderTop: '1px solid #4B5563',
      borderRadius: '12px',
    },
    pageButtonsStyle: {
      fill: 'white',
      '&:disabled': {
        fill: '#6B7280',
      },
      '&:hover': {
        backgroundColor: '#374151',
      },
    },
  },
};

export default tableStyle;
