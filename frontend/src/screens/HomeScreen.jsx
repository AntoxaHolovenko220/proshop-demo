import { Col, Row } from 'react-bootstrap'
import { Product, Loader, Message } from '@components'
import { useGetProductsQuery } from '@slices/productsApiSlice'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
	const { pageNumber } = useParams()
	const { data, isLoading, error } = useGetProductsQuery({ pageNumber })

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>
					{error?.data?.message || error.error}
				</Message>
			) : (
				<>
					<h1>Latest Products</h1>
					<Row>
						{data.products.map(product => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	)
}

export default HomeScreen
