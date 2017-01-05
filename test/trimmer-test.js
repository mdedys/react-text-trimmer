import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import should from 'should';
import 'should-sinon';
import Trimmer from '../src/trimmer';

describe( '<Trimmer/>', () => {

	it( 'should have default props set', () => {
		const wrapper = shallow( <Trimmer /> );
		wrapper.instance().props.className.should.equal( '' );
		wrapper.instance().props.textTail.should.equal( '...' );
		should.not.exist( wrapper.instance().props.dangerouslySetInnerHTML );
	});

	it( 'should have className and textTail set properly when passed', () => {
		const className = 'testClassName';
		const textTail = 'abc';

		const wrapper = shallow(
			<Trimmer className = { className } textTail = { textTail } />
		);

		wrapper.instance().props.className.should.equal( className );
		wrapper.instance().props.textTail.should.equal( textTail );
	});

	//TODO: Add tests for new logic for trimming
	/*it( 'should set component style correctly', () => {
		const wrapper = shallow( <Trimmer /> );

		const style = {
			lineHeight: 'inherit',
			height: 'inherit',
			maxHeight: 'inherit',
			width: 'inherit',
			overflow: 'hidden'
		};

		wrapper.props().style.should.deepEqual( style );
	});

	it( 'should render component dangerously when set', () => {
		const _html = {
			__html:  'some text'
		};

		const wrapper = mount( <Trimmer dangerouslySetInnerHTML = { _html } /> );

		should.exist( wrapper.instance().props.dangerouslySetInnerHTML );
		wrapper.text().should.equal( _html.__html );
	});

	it( 'should trim text when component mounts', () => {
		const trimStub = sinon.spy( Trimmer.prototype, 'trim' );
		const wrapper = mount( <Trimmer /> );
		trimStub.should.be.calledOnce();
		trimStub.restore();
	});

	it( 'should trim text when component is updated', () => {
		const trimStub = sinon.spy( Trimmer.prototype, 'trim' );
		const wrapper = mount( <Trimmer /> );
		trimStub.should.be.calledOnce();
		wrapper.update();
		trimStub.should.be.calledTwice();
		trimStub.restore();
	});*/

	//TODO: Test Trim function
	// Issue testing dom manipulation
});
