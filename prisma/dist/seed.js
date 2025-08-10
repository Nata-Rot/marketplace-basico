"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var bcryptjs_1 = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, businessUser, clientUser, businessUser2, clientUser2, techStore, fashionStore, homeStore, allProducts, getProductIdByName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Iniciando seed de la base de datos...');
                    // Limpiar datos existentes
                    return [4 /*yield*/, prisma.order.deleteMany()];
                case 1:
                    // Limpiar datos existentes
                    _a.sent();
                    return [4 /*yield*/, prisma.product.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.store.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.account.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.session.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()
                        // Crear usuarios de prueba
                    ];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, bcryptjs_1["default"].hash('123456', 10)];
                case 7:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Juan Pérez',
                                email: 'business@test.com',
                                password: hashedPassword,
                                userType: 'BUSINESS'
                            }
                        })];
                case 8:
                    businessUser = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'María García',
                                email: 'cliente@test.com',
                                password: hashedPassword,
                                userType: 'CLIENT'
                            }
                        })
                        // Crear usuarios adicionales
                    ];
                case 9:
                    clientUser = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Carlos Rodríguez',
                                email: 'business2@test.com',
                                password: hashedPassword,
                                userType: 'BUSINESS'
                            }
                        })];
                case 10:
                    businessUser2 = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'Ana López',
                                email: 'cliente2@test.com',
                                password: hashedPassword,
                                userType: 'CLIENT'
                            }
                        })
                        // Crear tiendas
                    ];
                case 11:
                    clientUser2 = _a.sent();
                    return [4 /*yield*/, prisma.store.create({
                            data: {
                                name: 'TechnoShop',
                                description: 'Los mejores productos tecnológicos y gadgets',
                                ownerId: businessUser.id
                            }
                        })];
                case 12:
                    techStore = _a.sent();
                    return [4 /*yield*/, prisma.store.create({
                            data: {
                                name: 'Moda Elegante',
                                description: 'Ropa y accesorios de última moda',
                                ownerId: businessUser.id
                            }
                        })];
                case 13:
                    fashionStore = _a.sent();
                    return [4 /*yield*/, prisma.store.create({
                            data: {
                                name: 'Hogar & Decoración',
                                description: 'Todo para hacer de tu hogar un lugar especial',
                                ownerId: businessUser2.id
                            }
                        })
                        // Crear productos para TechnoShop
                    ];
                case 14:
                    homeStore = _a.sent();
                    // Crear productos para TechnoShop
                    return [4 /*yield*/, prisma.product.createMany({
                            data: [
                                {
                                    name: 'iPhone 15 Pro',
                                    description: 'El último iPhone con cámara profesional y chip A17 Pro',
                                    price: 1299.99,
                                    stock: 10,
                                    storeId: techStore.id
                                },
                                {
                                    name: 'MacBook Air M2',
                                    description: 'Laptop ultradelgada con chip M2 y 8GB de RAM',
                                    price: 1199.99,
                                    stock: 5,
                                    storeId: techStore.id
                                },
                                {
                                    name: 'AirPods Pro',
                                    description: 'Auriculares inalámbricos con cancelación de ruido',
                                    price: 249.99,
                                    stock: 20,
                                    storeId: techStore.id
                                },
                                {
                                    name: 'iPad Air',
                                    description: 'Tablet versátil para trabajo y entretenimiento',
                                    price: 599.99,
                                    stock: 8,
                                    storeId: techStore.id
                                },
                            ]
                        })
                        // Crear productos para Moda Elegante
                    ];
                case 15:
                    // Crear productos para TechnoShop
                    _a.sent();
                    // Crear productos para Moda Elegante
                    return [4 /*yield*/, prisma.product.createMany({
                            data: [
                                {
                                    name: 'Vestido de Verano',
                                    description: 'Vestido ligero y cómodo perfecto para el verano',
                                    price: 89.99,
                                    stock: 15,
                                    storeId: fashionStore.id
                                },
                                {
                                    name: 'Jeans Premium',
                                    description: 'Jeans de alta calidad con corte moderno',
                                    price: 129.99,
                                    stock: 12,
                                    storeId: fashionStore.id
                                },
                                {
                                    name: 'Chaqueta de Cuero',
                                    description: 'Chaqueta de cuero genuino estilo clásico',
                                    price: 299.99,
                                    stock: 6,
                                    storeId: fashionStore.id
                                },
                                {
                                    name: 'Zapatos Deportivos',
                                    description: 'Zapatillas cómodas para uso diario',
                                    price: 149.99,
                                    stock: 18,
                                    storeId: fashionStore.id
                                },
                            ]
                        })
                        // Crear productos para Hogar & Decoración
                    ];
                case 16:
                    // Crear productos para Moda Elegante
                    _a.sent();
                    // Crear productos para Hogar & Decoración
                    return [4 /*yield*/, prisma.product.createMany({
                            data: [
                                {
                                    name: 'Sofá Moderno',
                                    description: 'Sofá de 3 plazas con diseño contemporáneo',
                                    price: 899.99,
                                    stock: 3,
                                    storeId: homeStore.id
                                },
                                {
                                    name: 'Mesa de Centro',
                                    description: 'Mesa de centro de madera con estilo minimalista',
                                    price: 199.99,
                                    stock: 7,
                                    storeId: homeStore.id
                                },
                                {
                                    name: 'Lámpara de Pie',
                                    description: 'Lámpara elegante con luz LED regulable',
                                    price: 79.99,
                                    stock: 12,
                                    storeId: homeStore.id
                                },
                                {
                                    name: 'Alfombra Persa',
                                    description: 'Alfombra tradicional de alta calidad',
                                    price: 449.99,
                                    stock: 4,
                                    storeId: homeStore.id
                                },
                            ]
                        })
                        // Obtener todos los productos con sus IDs
                    ];
                case 17:
                    // Crear productos para Hogar & Decoración
                    _a.sent();
                    return [4 /*yield*/, prisma.product.findMany({
                            select: {
                                id: true,
                                name: true
                            }
                        })
                        // Función para encontrar ID de producto por nombre con tipado explícito
                    ];
                case 18:
                    allProducts = _a.sent();
                    getProductIdByName = function (name) {
                        var product = allProducts.find(function (p) { return p.name === name; });
                        if (!product) {
                            throw new Error("Producto " + name + " no encontrado");
                        }
                        return product.id;
                    };
                    // Crear pedidos de ejemplo con tipado seguro
                    return [4 /*yield*/, prisma.order.createMany({
                            data: [
                                {
                                    quantity: 1,
                                    total: 249.99,
                                    clientId: clientUser.id,
                                    productId: getProductIdByName('AirPods Pro'),
                                    storeId: techStore.id,
                                    status: 'CONFIRMED'
                                },
                                {
                                    quantity: 2,
                                    total: 179.98,
                                    clientId: clientUser2.id,
                                    productId: getProductIdByName('Vestido de Verano'),
                                    storeId: fashionStore.id,
                                    status: 'PENDING'
                                },
                                {
                                    quantity: 1,
                                    total: 199.99,
                                    clientId: clientUser.id,
                                    productId: getProductIdByName('Mesa de Centro'),
                                    storeId: homeStore.id,
                                    status: 'SHIPPED'
                                },
                            ]
                        })];
                case 19:
                    // Crear pedidos de ejemplo con tipado seguro
                    _a.sent();
                    console.log('✅ Seed completado exitosamente!');
                    console.log('');
                    console.log('👥 Usuarios creados:');
                    console.log("\uD83D\uDCE7 Business: " + businessUser.email + " / 123456");
                    console.log("\uD83D\uDCE7 Cliente: " + clientUser.email + " / 123456");
                    console.log("\uD83D\uDCE7 Business 2: " + businessUser2.email + " / 123456");
                    console.log("\uD83D\uDCE7 Cliente 2: " + clientUser2.email + " / 123456");
                    console.log('');
                    console.log('🏪 Tiendas creadas: 3');
                    console.log('📦 Productos creados: 12');
                    console.log('🛒 Pedidos de ejemplo: 3');
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error('❌ Error en seed:', e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
