import { Col, Row } from 'react-bootstrap'
import { Product, Loader, Message, Paginate } from '@components'
import { useGetProductsQuery } from '@slices/productsApiSlice'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
	const { keyword, pageNumber } = useParams()
	const { data, isLoading, error } = useGetProductsQuery({
		keyword,
		pageNumber,
	})

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
					<Paginate
						pages={data.pages}
						page={data.page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
