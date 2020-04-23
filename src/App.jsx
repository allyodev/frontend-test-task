import React, { useState, useCallback, useEffect } from 'react'
import get from 'lodash/get'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import parseLink from './helpers/parseLink'
import PreviewCard from './components/PreviewCard'
import fetchPreviewData from './helpers/fetchPreviewData'

const App = () => {
  const [data, setData] = useState(null);
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLink(parseLink(value))
  }, [value])

  useEffect(() => {
    let cancelled = false

    if (link) {
      setLoading(true)
      fetchPreviewData(link).then(data => {
        if (!cancelled) setData(data)
      }).catch(error => {
        if (!cancelled) setError(error)
      }).finally(() => {
        if (!cancelled) setLoading(false)
      })
    }

    return () => {
      cancelled = true
    }
  }, [link])

  const onChange = useCallback(event => {
    setValue(event.target.value)
  }, [])

  const image = get(data, 'images.0')
  const title = get(data, 'title')
  const description = get(data, 'description')

  const hasFields = image || title || description

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={value}
          onChange={onChange}
          placeholder='Type your text with link here'
        />
      </Grid>
      <Grid item xs={12}>
        <Box display='flex' alignItems='center' justifyContent='center'>
          {loading &&
            <CircularProgress />
          }
          {!loading && data && (error || !hasFields) &&
            <Typography>
              No preview available for {link}
            </Typography>
          }
          {!loading && !error && hasFields &&
            <PreviewCard
              image={image}
              title={title}
              description={description}
            />
          }
        </Box>
      </Grid>
    </Grid>
  )
}

export default App;