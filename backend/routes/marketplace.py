from flask import Blueprint, request, jsonify
from models.database import db, Product

marketplace_bp = Blueprint('marketplace', __name__)

@marketplace_bp.route('/products', methods=['GET'])
def get_products():
    """
    Get marketplace products with filtering and pagination
    
    Query Parameters:
    - search: str - Search term for product name
    - category: str - Filter by category
    - priceRange: str - Price range filter (under-30, 30-50, 50-100, over-100)
    - sortBy: str - Sort option (name, price-low, price-high, rating)
    - page: int - Page number (default: 1)
    - limit: int - Items per page (default: 20)
    
    Returns:
    - JSON object with products array and pagination info
    """
    try:
        search = request.args.get('search', type=str)
        category = request.args.get('category', type=str)
        price_range = request.args.get('priceRange', type=str)
        sort_by = request.args.get('sortBy', default='name', type=str)
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=20, type=int)
        
        # Build query
        query = Product.query
        
        # Apply filters
        if search:
            query = query.filter(Product.name.ilike(f'%{search}%'))
        if category and category != 'all':
            query = query.filter(Product.category == category)
        if price_range and price_range != 'all':
            if price_range == 'under-30':
                query = query.filter(Product.price < 30)
            elif price_range == '30-50':
                query = query.filter(Product.price >= 30, Product.price <= 50)
            elif price_range == '50-100':
                query = query.filter(Product.price > 50, Product.price <= 100)
            elif price_range == 'over-100':
                query = query.filter(Product.price > 100)
        
        # Apply sorting
        if sort_by == 'price-low':
            query = query.order_by(Product.price.asc())
        elif sort_by == 'price-high':
            query = query.order_by(Product.price.desc())
        elif sort_by == 'rating':
            query = query.order_by(Product.rating.desc())
        else:
            query = query.order_by(Product.name.asc())
        
        # Pagination
        pagination = query.paginate(page=page, per_page=limit, error_out=False)
        products = [product.to_dict() for product in pagination.items]
        
        return jsonify({
            'products': products,
            'total': pagination.total,
            'page': page,
            'limit': limit,
            'pages': pagination.pages
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@marketplace_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """
    Get single product by ID
    
    Parameters:
    - product_id: int - Product ID
    
    Returns:
    - JSON object with product details
    """
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@marketplace_bp.route('/products', methods=['POST'])
def create_product():
    """
    Create a new product (for farmers)
    
    Request Body:
    - name: str
    - description: str
    - price: float
    - stock: int
    - category: str
    - image: str (optional)
    
    Returns:
    - JSON object with created product
    """
    try:
        data = request.get_json()
        
        product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            stock=data['stock'],
            category=data.get('category', 'Other'),
            image=data.get('image', '🌾'),
            farmer=data.get('farmer', 'Unknown')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify(product.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

