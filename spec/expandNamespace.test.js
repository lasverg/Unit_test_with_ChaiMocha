import {
	AssertionError
} from 'assert';

const proxyquire = require('proxyquire');
var loadNamespaceStub;

function callbackStub(dirName) {
	return {
		namespaces: {
			[dirName]: dirName
		}
	}
};

describe('The ./lib/expandNamespaces function', () => {
	beforeEach(() => {
		loadNamespaceStub = sinon.stub();
	})



	it('should keep paths without namespaces unchanged', () => {

		const expandNamespaces = proxyquire('../lib/expandNamespace', {
			'./loadNamespaces': sinon.stub()
		});

		const expected = './somePath';
		const actual = expandNamespaces(expected);

		expect(actual).to.equal(expected);

	});

	/*
	 *	start writing tests here
	 */

	it('should return path name "../lib/expandNamespace"', (done) => {

		const modulePath = '<lib>/expandNamespace';
		const callerPath = 'expandNamespace';
		const expandNamespaces = proxyquire('../lib/expandNamespace', {
			'./loadNamespaces': loadNamespaceStub.returns(callbackStub('lib'))
		});

		const expected = "..\\lib\\expandNamespace";
		const actual = expandNamespaces(modulePath, callerPath);
		expect(actual).to.equal(expected);

		done();

	});

});

describe('The ./lib/expandNamespaces function should have Error', () => {

	it('<lib> should be not defined', (done) => {
		const modulePath = '<lib>';
		const callerPath = 'lib';
		const expandNamespaces = proxyquire('../lib/expandNamespace', {
			'./loadNamespaces': loadNamespaceStub.sinon.stub().returns(callbackStub())
		});

		function expectedAssertError() {
			try {
				return expandNamespaces(modulePath, callerPath);
			} catch (error) {
				return error.message
			}
		}

		const expected = "namespace <lib> is not defined.";
		const actual = expectedAssertError();

		expect(actual).to.equal(expected)

		done();
	});

});
