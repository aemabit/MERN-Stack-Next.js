import { useRouter } from 'next/router'
import { Container, Pagination } from 'semantic-ui-react'


function ProductPagination({ totalPages }) {

  const router = useRouter()

  return(
    <Container textAlign="center" style={{ margin: '2em' }}>
      <Pagination
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        totalPages={totalPages}
        onPageChange={(event, data) => {
          data.activePage === 1
            ? router.push('/')
            : router.push(`/?page=${data.activePage}`);
        }}
      />
    </Container>
  )
}

export default ProductPagination;
